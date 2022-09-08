const File = require('../../models/file');
const Validator = require('validatorjs');
const fs = require('fs');
const Path = require('path');
class StorageController {
    constructor() {
        this.upload = this.upload.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }

    async list(req, res) {
        var data = req.body;
        var files = await File.find(data);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                'data': files,
            },
        });
    }

    async get(req, res) {
        var data = req.body;
        var params = req.params;
        console.log(params);
        var file = await File.findOne({ reference: params.id }).select('+path');
        if (file == null) return res.sendStatus(404);
        res.redirect(`/file/${params.id}/${file.filename}`);
    }

    async newGet(req, res) {
        var data = req.body;
        var params = req.params;
        console.log(params);
        var file = await File.findOne({ reference: params.id }).select('+path');
        if (file == null) return res.sendStatus(404);
        var path = Path.join(__dirname, `../..${file.path}`);
        console.log(file)
        console.log(path)
        if (!fs.existsSync(path)) return res.sendStatus(404);
        res.sendFile(path);
    }

    async upload(req, res) {
        var data = {
            ...req.body,
            ...req.files,
        };
        let rules = {
            file: 'required',
            folder: 'required',
        };
        let validation = new Validator(data, rules);
        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }
        var newFile = await this.saveFile(data.file, data.folder, req);
        res.send({
            'status': 'success',
            'message': 'Upload success',
            'data': newFile,
        });
    }

    async uploadFiles(req, res) {
        var data = {
            ...req.body,
            ...req.files,
        };
        let rules = {
            files: 'required',
            folder: 'required',
        };
        let validation = new Validator(data, rules);
        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }
        var files = [];
        if (Array.isArray(data.files)) {
            for (var f of data.files) {
                var newFile = await this.saveFile(f, data.folder, req);
                files.push(newFile.url);
            }
        } else {
            var newFile = await this.saveFile(data.files, data.folder, req);
            files.push(newFile.url);
        }

        res.send({
            'status': 'success',
            'message': 'Upload success',
            'data': {
                'files': files
            },
        });
    }

    async createFolder(req, res) {
        var data = req.body;
        let rules = {
            folder: 'required',
        };
        let validation = new Validator(data, rules);
        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }
        var folder = await this.saveFolder(data.folder, req);
        res.send({
            'status': 'success',
            'message': 'Folder created successfully.',
            'data': folder,
        })
    }

    async saveFile(file, folder, req) {
        console.log('File:', file)
        var newFolder = await this.saveFolder(folder, req);
        var path = `/storage${newFolder.fullpath}/${randomString(5)}_${file.name}`;
        path = path.replaceAll('//', '/');
        console.log('Full Path:', path)
        var reference = randomString(60);
        var refExist = await File.findOne({ reference: reference });
        while (refExist != null) {
            reference = randomString(60);
            refExist = await File.findOne({ reference: reference });
        }
        var newFile = new File({
            uid: req.auth.id,
            reference: reference,
            filename: file.name,
            folder: newFolder.fullpath,
            path: path,
            size: file.size,
            mimetype: file.mimetype,
            url: `${req.protocol}://${req.get('host')}/file/${reference}/${file.name}`,
        });

        file.mv(`.${path}`);
        await newFile.save()
        var resfile = newFile.toJSON();
        return resfile;
    }

    async saveFolder(folder, req) {
        if (folder.slice(folder.length - 1) == '/') folder = folder.slice(0, -1);
        if (folder == '') return { fullpath: '/' };

        console.log(folder)

        var folderpath = folder.split('/');
        var foldername = folderpath[folderpath.length - 1];
        var folderpath = folder.slice(0, -foldername.length);

        if (folderpath.length != 1) {
            if (folderpath.slice(folderpath.length - 1) == '/') folderpath = folderpath.slice(0, -1);
        }

        var newFolder = await File.findOne({ folder: folderpath, filename: foldername });


        if (newFolder == null) {
            newFolder = new File({
                uid: req.auth.id,
                type: 'folder',
                filename: foldername,
                folder: folderpath,
            });
            await newFolder.save()
        }

        return {
            ...newFolder.toJSON(),
            fullpath: folder,
        };
    }
}

module.exports = new StorageController();