import axios from "axios";
import {useState} from "react"

const ImageForm = () => {

  const [file, setFile] = useState()  
  const [progress, setProgress] = useState(0)  
  const submitHandler = async data => 
    ({
        ...data,
        attachmentId: file.id,
    })
  const fileHandler = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.post(
      "http://localhost:8080/api/v1/attachments",
      formData,
      {
        onUploadProgress: pr => {
            setProgress(Math.trunc(pr.loaded/ (pr.total/100)))
            console.log(pr);
        }
      }
    );

    setFile(res.data.data.newAttachment)
    setProgress(0)
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <input
            className="img-input"
            type="file"
            id="avatar"
            onChange={fileHandler}
          />
        </div>
      </form>
    </>
  );
};

export default ImageForm;
