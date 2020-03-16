import axios from 'axios';
import { apiBase } from './consts';

interface IFileUploadResponse {
  filename: string;
  thumbnailPath: string;
}

const api = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios
      .post<IFileUploadResponse>(
        `${apiBase}/video`,
        formData,
        { headers: { 'content-type': 'multipart/form-data' } }
      );
    return data;
  },

};

export default api;
