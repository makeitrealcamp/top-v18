import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setUser: Dispatch<SetStateAction<string | null>>;
}

function Login(props: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");

  function handleClick(type: any) {
    type.preventDefault();
    props.setUser(user);
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="m-4 flex">
        <input
          onChange={(e) => setUser(e.target.value)}
          value={user}
          className="rounded-l-lg p-4 w-96 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Ingresa tu nombre"
          autoFocus={true}
        />
        <button
          onClick={handleClick}
          className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
