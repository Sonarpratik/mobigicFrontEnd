import { url } from "../features/url";

export const handleDownloadFIle=async (file)=>{
    const url2 = `${url}/${file}`;
    try {
      // Fetch the file
      const response = await fetch(url2);
      if (!response.ok) throw new Error('Network response was not ok.');

      // Get the content type from headers
      const contentType = response.headers.get('Content-Type');
      const fileExtension = contentType ? contentType.split('/')[1] : 'unknown';

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `downloaded_file.${fileExtension}`; // Dynamically set the file extension

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href); // Revoke the Object URL
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }

}