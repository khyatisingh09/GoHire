const formatDate = (dateString: string) => {  
    const date = new Date(dateString);  
    const options = { year: 'numeric' as const, month: 'short' as const };  
    return date.toLocaleString('en-US', options);  
  }  
  function timeAgo(time:string){
  const now = new Date();
  const postDate = new Date(time);
  const diff = now.getTime() - postDate.getTime(); // Difference in milliseconds  

const seconds = Math.floor(diff / 1000);  
const minutes = Math.floor(seconds / 60);  
const hours = Math.floor(minutes / 60);  
const days = Math.floor(hours / 24);  
const months = Math.floor(days / 30);  

if (seconds < 60) {  
    return `${seconds} seconds ago`;  
} else if (minutes < 60) {  
    return `${minutes} minutes ago`;  
} else if (hours < 24) {  
    return `${hours} hours ago`;  
} else if (days < 30) {  
    return `${days} days ago`;  
} else {  
    return `${months} months ago`;  
  }
}
const getBase64=(file:any)=>{
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=error=>reject(error);
    });
  };
  const formateInterviewTime=(dateStr:any)=>{
    const date = new Date(dateStr);  
  // Format the date to "Month Day, Year Hour:Minute AM/PM"  
    return date.toLocaleString('en-US', {  
    year: 'numeric',  
    month: 'long',  
    day: 'numeric',  
    hour: 'numeric',  
    minute: 'numeric',  
    hour12: true  
});  
}
function openBase64PDF(base64String:string) {  
  // Convert Base64 string to a binary string  
  const byteCharacters = atob(base64String);  
  
  // Create an array to hold the binary data  
  const byteNumbers = new Array(byteCharacters.length);  
  
  // Convert each character to its char code  
  for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);  
  }  
  
  // Convert to Uint8Array  
  const byteArray = new Uint8Array(byteNumbers);  
  
  // Create a Blob from the byte array (PDF type in this case)  
  const blob = new Blob([byteArray], { type: 'application/pdf' });  
  
  // Create a temporary URL for the Blob  
  const blobURL = URL.createObjectURL(blob);
  // Open the Blob URL in a new tab  
  window.open(blobURL, '_blank');  
  }  
  export { formatDate, timeAgo, getBase64, formateInterviewTime, openBase64PDF };