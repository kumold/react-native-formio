/** THIS FILE IS NOT USABLE, NEEDS TO BE RECREATED IN REACT NATIVE */

const url = (formio) => ({
    title: 'Url',
    name: 'url',
    uploadFile(file, fileName, dir, progressCallback, url) {
        return new Promise(((resolve, reject) => {
            const data = {
                dir,
                file,
                name: fileName
            };

            // Send the file with data.
            const xhr = {};

            if (typeof progressCallback === 'function') {
                xhr.upload.onprogress = progressCallback;
            }

            const fd = {};
            for (const key in data) {
                fd.append(key, data[key]);
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Need to test if xhr.response is decoded or not.
                    let respData = {};
                    try {
                        respData = (typeof xhr.response === 'string') ? JSON.parse(xhr.response) : {};
                        respData = (respData && respData.data) ? respData.data : respData;
                    }
                    catch (err) {
                        respData = {};
                    }

                    const url = Object.prototype.hasOwnProperty.call(respData, 'url') ? respData.url : `${xhr.responseURL}/${fileName}`;
                    resolve({
                        storage: 'url',
                        name: fileName,
                        url,
                        size: file.size,
                        type: file.type,
                        data: respData
                    });
                }
                else {
                    reject(xhr.response || 'Unable to upload file');
                }
            };

            // Fire on network error.
            xhr.onerror = () => reject(xhr);

            xhr.onabort = () => reject(xhr);

            xhr.open('POST', url);
            const token = formio.getToken();
            if (token) {
                xhr.setRequestHeader('x-jwt-token', token);
            }
            xhr.send(fd);
        }));
    },
    downloadFile(file) {
        // Return the original as there is nothing to do.
        return Promise.resolve(file);
    }
});

url.title = 'Url';
export default url;
