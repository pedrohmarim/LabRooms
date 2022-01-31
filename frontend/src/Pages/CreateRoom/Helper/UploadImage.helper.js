export function isValidExtension(extension) {
    const acceptedExtensions = [
        'jpeg',
        'jpg',
        'png',
      ];
    
    return acceptedExtensions.includes(extension);
}

export function isValidFileSize(fileSize, MaxSizeMB = 15) {
    return fileSize / 1024 / 1024 < MaxSizeMB;
}

export const acceptedFileTypes = '.jpg,.jpeg,.png';
