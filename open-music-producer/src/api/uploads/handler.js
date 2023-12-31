const autoBind = require('auto-bind');

class UploadsCoverHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postUploadCoverAlbumHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this._validator.validateImageHeaders(cover.hapi.headers);
    const filename = await this._service.writeFile(cover, cover.hapi);
    await this._service.updateAlbum(id, `http://${process.env.HOST}:${process.env.PORT}/upload/covers/${filename}`);
    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsCoverHandler;
