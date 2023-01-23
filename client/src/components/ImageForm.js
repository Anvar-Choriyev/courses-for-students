import axios from "axios";
import {useState} from "react"
import { toast } from "react-toastify";

const ImageForm = () => {

  const [file, setFile] = useState()  
  const submitHandler = async data => 
    ({
        ...data,
        attachmentId: file.id,
    })
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/subjects",
        formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      );
      setFile(res.data.data.newAttachment)
    } catch (error) {
      toast.error(error?.response.data.message)
    }
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
