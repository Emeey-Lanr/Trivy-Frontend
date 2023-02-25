
import Sidebar from "./Sidebar"
import DashbarNav from "./DashbarNav"
import SidBarBack from "./SideBarBack"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { appContext } from "../App"

const Participants = () => {
    const {adminEndPoint} = useContext(appContext)
    const [Participants, setParticipants] = useState([])
    const  verifyParticipantsEndPoints = `${adminEndPoint}/findParticipants`
    useEffect(() => {
        axios
          .get(verifyParticipantsEndPoints, {
            headers: {
              Authorization: `bearer ${localStorage.quizxxx}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((result) => {
            if (result.data.status) {
            }
          });
    },[])
  return (
    <div className="w-10p">
      <SidBarBack />
      <Sidebar /> 
          <DashbarNav />
          <div className="py-2 w-5p mx-auto mt-12 mb-3 bg-green-like-100 rounded-sideicon flex justify-center items-center">
            <span className="text-xl text-white">Acid Participants</span>
          </div>
          <div className="w-7p bg-white rounded-sideicon mx-auto shadow-md overflow-x-scroll">
              <div style={{ width: "1400px" }}>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, recusandae repellat ut quaerat corrupti, sequi aut obcaecati ab beatae excepturi sint itaque illo asperiores suscipit esse, tempora sed numquam. Non quidem odio adipisci harum, distinctio dolorem est quam aut sint. Assumenda eius quasi beatae repellendus ut cumque amet! Laboriosam totam culpa nam autem iure quis, magni, tempora expedita earum accusantium facilis qui voluptatum, eaque quibusdam error dolor natus ipsum hic inventore asperiores sapiente. Vero quidem nesciunt iusto officiis quae quibusdam similique, ab praesentium libero rem cum deleniti enim, neque atque perferendis? Temporibus debitis consequuntur doloribus voluptates beatae, enim quos vero aliquam odio expedita reiciendis cumque nemo itaque ad quod officia corrupti quam rerum sit esse rem reprehenderit eius dolorum necessitatibus! Provident qui illum dolor reiciendis cupiditate id reprehenderit cumque est fugiat, ad tempore aperiam voluptates, illo repellat libero ipsam beatae perferendis nisi dolores debitis quam ipsum, perspiciatis quia nam. Deleniti architecto facilis laudantium cumque delectus iste dolores sit, qui atque esse eaque soluta minima alias quisquam incidunt dicta. Fugit laborum eos odit deleniti, quod consectetur! Magnam odio alias tempore tempora saepe iure minus nihil harum quibusdam eos corrupti quas, omnis cupiditate. Cum sint consectetur nam molestiae aliquam, nesciunt, dicta ad error unde nostrum omnis corporis? Fugit possimus, doloribus alias laborum architecto placeat obcaecati, debitis iste fuga aperiam excepturi dicta sunt quod sit qui nihil maxime corporis quaerat a dolorum assumenda nisi? Tempore beatae, assumenda nam, voluptates omnis provident sequi magnam, illum laborum sint aperiam voluptatem odit doloremque asperiores similique eveniet veritatis cumque vitae ducimus quisquam culpa optio? Aut nemo porro ullam voluptatum distinctio, cupiditate ad nulla, accusamus neque natus in? Possimus quisquam et voluptates optio sunt expedita voluptas excepturi aperiam rem cupiditate ipsam recusandae, quos autem, eos nulla suscipit deleniti accusamus laboriosam aspernatur ut dolor accusantium! Numquam laborum explicabo asperiores aperiam vel, voluptatibus nihil autem dolores nesciunt enim harum iure quidem laboriosam. Adipisci placeat voluptate excepturi dolorum quam consequatur corporis vel harum, iste minima pariatur, aspernatur quia ipsam nulla rem. Minima odit beatae totam nostrum quidem incidunt a, nam ipsum accusamus ipsa tenetur cupiditate placeat qui similique dolores alias officia magnam, magni inventore vero! Veritatis quibusdam, nam doloremque, repudiandae cupiditate libero ducimus odio ratione odit nulla maiores officiis mollitia officia excepturi distinctio molestiae adipisci fugiat ut, ipsam sunt impedit. Beatae minus ipsa, illum recusandae iure consectetur ducimus nesciunt minima velit rem voluptatem et cupiditate accusamus ex. Expedita ratione magnam velit neque quod ut, ipsum recusandae natus! Blanditiis neque error quae laudantium necessitatibus et illo ratione sed velit repudiandae, quia nulla optio voluptatibus, repellat ipsum id nam aliquam veniam tempora laboriosam nisi rem cumque iusto. Recusandae quod, quam aspernatur unde explicabo vero placeat laborum vitae dolorum sed iste consectetur harum numquam. Tempora, repudiandae ea facere excepturi cumque velit tempore dolore ratione assumenda quasi aperiam, sed laudantium rem eum adipisci impedit quisquam id architecto magni quas ipsa minus nulla quos. Magni quo, aperiam explicabo saepe natus harum error ex ea. Iusto, a ducimus? Voluptas id eveniet doloribus dolor quasi doloremque temporibus autem.</p>
              </div>
              
          </div>
          
    </div>
  );
}

export default Participants