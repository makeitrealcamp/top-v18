import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

interface ChatProps {
  user: string | null
}

interface Room {
  _id: string
  name: string
}

interface Message {
  _id: string
  date: String
  from: String
  content: String
}

function Chat(props: ChatProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    async function load() {
      let response = await fetch("http://localhost:3001/api/rooms")
      let data = await response.json()
      setRooms(data)

      if (data.length > 0) {
        const room = data[0] 
        setSelectedRoom(room)

        response = await fetch(`http://localhost:3001/api/rooms/${room._id}/messages`)
        data = await response.json()
        setMessages(data)
      }
    }

    load()
  }, [])

  async function handleClick() {
    const response = await fetch(`http://localhost:3001/api/rooms/${selectedRoom?._id}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, from: props.user })
    })
    const data = await response.json()
    setMessages(messages => [...messages, data])
    setContent("")
  }

  return props.user == null ? <Navigate to="/login" /> : (
    <div className="bg-gray-100">
      <div className="container mx-auto min-h-screen">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-2">
            <div className="rounded-lg border border-solid border-gray-200 bg-white mt-5">
              { rooms.map(room => <div className={`hover:bg-indigo-100 ${selectedRoom?._id == room._id ? "bg-indigo-100" : null}`}><button className="p-3">{ room.name }</button></div> ) }
              
            </div>
            <div className="p-5 text-center">
              <button className="text-blue-700 font-semibold">Create Room</button>
            </div>
          </div>
          <div className="col-span-10 rounded-lg border border-solid border-gray-200 bg-white mt-5">
            { messages.map(message => (
              <div className="p-4">
                <div className="font-bold">{ message.from }</div>
                <div className="">{ message.content }</div>
              </div>
            ))}
            { 
              selectedRoom != null 
              ? (
                <div className="p-4 flex">
                  <input type="text" onChange={(e) => setContent(e.target.value)} value={content} className="grow rounded-lg border border-gray-200 mr-4 p-2 "></input>
                  <button onClick={handleClick}>Enviar</button>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat