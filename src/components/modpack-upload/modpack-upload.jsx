import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { toast } from 'react-toastify'

import './modpack-upload.scss'

export default function ModpackUpload() {
    useEffect(() => {
        window.modpacks.onProgress((message) => console.log(message))
    }, [])

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (file.type !== 'application/zip') {
                toast.error('Only ZIP files are accepted.', { theme: 'colored' });
            } else {
                if (file.path) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const blob = new Blob([reader.result], { type: file.type });
                        handleDownload(blob, file.name);
                    };
                    reader.readAsArrayBuffer(file);
                } else {
                    handleDownload(file.preview, file.name);
                }
            }
        })
    }, [])

    function onDropRejected() {
        toast.error('Only ZIP files are accepted.', { theme: 'colored' })
    }

    async function onURLSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        const url = e.target.elements.url.value.trim()
        if (!url) return toast.error('URL is required.')
        let response
        try {
            response = await axios.head(url)
            const contentType = response.headers['content-type']
            const contentDisposition = response.headers['content-disposition']
            let filename = ''
            if (contentDisposition) {
                const matches = contentDisposition.match(/filename="(.*?)"/)
                if (matches) filename = matches[1]
            }
            if (!contentType) return toast.error('URL does not return a file type.')
            if (contentType === 'application/zip' || contentType === 'application/x-zip-compressed' || contentType === 'application/octet-stream') return handleDownload(url, filename)
            return toast.error('URL must link to a ZIP file.')
        } catch (error) {
            return toast.error('URL is not accessible.')
        }
    }

    async function handleDownload(url, filename) {
        await window.modpacks.get(url, filename)
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, onDropRejected, accept: 'application/zip' })

    return (
        <div className="modpack-upload-container">
            <div {...getRootProps()} className="modpack-upload">
                <input {...getInputProps()} />
                <p>Drag 'n' drop a modpack here, or click to select one</p>
                <i className="fa-regular fa-download"></i>
                <form onSubmit={onURLSubmit}>
                    <input type="url" name="url" placeholder="Or enter a URL" onClick={(event) => event.stopPropagation()} required />
                    <button type="submit" onClick={(event) => event.stopPropagation()}>Upload</button>
                </form>
            </div>
        </div>
    )
}
