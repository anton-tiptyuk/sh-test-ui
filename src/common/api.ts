import axios from 'axios';
import { apiBase } from './consts';

interface IFileUploadResponse {
  filename: string;
}

const api = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios
      .post<IFileUploadResponse>(`${apiBase}/video`, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(({ data: { filename } }) => filename);
  },

};

export default api;
