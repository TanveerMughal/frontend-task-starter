import { useEffect, useState } from "react";
import axios from "axios";


interface apiResponce {
  id: number,
  text: string

}
function App() {


  const [commintListData, setCommentListData] = useState([])
  const [comment, setComment] = useState("")
  const [isUpdateBtnClick, setIsUpdateBtnClick] = useState(false)
  const [selectedCommentData, setSelectedCommentData] = useState<any>({})


  const getCommentListData = async () => {
    axios.get("http://192.168.18.168:8000/comments/bravo").then((res: any) => {
      setCommentListData(res.data)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  useEffect(() => {
    getCommentListData();
  }, []
  )

  const addNewComment = () => {
    const apibody: {
      text: string
    } = {
      text: comment
    }
    if (isUpdateBtnClick) {
      axios.post(`http://192.168.18.168:8000/comments/bravo/${selectedCommentData?.id}}`, apibody).then(() => {
        alert("successfully updated")
        setComment("")
        getCommentListData()
      }).catch((error) => {
        console.log(error)
        alert("something went wrong")
      })
    }
    else {
      axios.post("http://192.168.18.168:8000/comments/bravo", apibody).then((res: any) => {
        alert("successfully added new Comment")
        setComment("")
        getCommentListData()
        console.log("res", res)
      }).catch((error) => {
        console.log(error)
        alert("something went wrong")
      })
    }
  }

  const deleteComment = (deleteItem: apiResponce) => {
    axios.delete(`http://192.168.18.168:8000/comments/bravo/${deleteItem.id}`).then(() => {
      alert("successfully deleted")
      getCommentListData()
    }).catch((error) => {
      console.log(error)
      alert("something went wrong")
    })
  }
  const updateComment = (item: apiResponce) => {
    setIsUpdateBtnClick(true)
    setComment(item.text)
    setSelectedCommentData(item)

  }


  return (
    <div className="  h-screen w-full bg-gay-100">
      <p className="text-3xl text-gray-600 font-bold text-center">Frontend task template</p>

      <div className="w-full pt-7">
        <p className="text-3xl text-gray-600 font-bold text-center">List Of Comments</p>
        {
          commintListData.map((commentItem: {
            id: number,
            text: string
          }, commentIndex) => {
            return <div className=" flex justify-center gap-5 py-3">
              <span className=" w-8 text-left">
                {commentIndex}
              </span>
              <p className="text-center py-2">
                {commentItem.text}
              </p>
              <button className=" px-2 py-1 bg-red-500 rounded-md
             text-white hover:scale-105 transition-all cursor-pointer" onClick={() => deleteComment(commentItem)}>
                Delete Comment
              </button>
              <button className=" px-2 py-1 bg-blue-700 rounded-md
             text-white hover:scale-105 transition-all cursor-pointer" onClick={() => updateComment(commentItem)}>
                Edit Comment
              </button>
            </div>
          })
        }

        <div className="w-full flex flex-col justify-center ">
          <textarea className=" w-[50%] bg-gray-400
           text-black mx-auto shadow-md  rounded-md  px-3 py-1" value={comment} rows={4} placeholder="write Comments Here"
            onChange={(e) => setComment(e.target.value)} />
          <div className="text-center py-3">
            <button className=" px-3 py-1 bg-green-600 rounded-md
             text-white hover:scale-105 transition-all cursor-pointer" onClick={addNewComment}>

              {
                isUpdateBtnClick ? "Edit Comment" : "Add New Comment"
              }
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
