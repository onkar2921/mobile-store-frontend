 const ConvertToBase64=(file)=>{
    return new Promise((res,rej)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            res(fileReader.result);
        };
        fileReader.onerror=(error)=>{
            rej(error);
        };
    });

} ;


export default ConvertToBase64