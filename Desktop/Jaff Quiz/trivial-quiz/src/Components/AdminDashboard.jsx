import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import bestStudent from "../Images/bestStudent.jpg";
import { FaRegUserCircle } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="bg-dashback-100 w-10p">
      <Sidebar />
      <div className="w-9p ml-auto sidebarNone:w-10p">
        <div className="w-9p bg-green-like-100 h-dbh mx-auto"></div>

        {/* Top Scorers */}
        <div className="top-scorer">
          <div className="beststudent bg-white shadow-lg mt-01">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage 10p object-cover"
              />
              <p className="border-b border-dashback-200 pt-2">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-orange-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
          <div className="beststudent bg-white shadow-lg">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage w-10p object-cover"
              ></img>
              <p className="border-b border-dashback-200 pt-2">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-yellow-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
          <div className="beststudent bg-white shadow-lg">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage w-10p object-cover"
              ></img>
              <p className="border border-dashback-200 rounded-sideicon text-center">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-red-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-7p mx-auto bg-chartbg sidebarNone:w-9p">
        corporis veniam qui eos ullam itaque provident assumenda voluptatem
      </div>

      {/* All payer total score */}
      <div className="bg-white w-7p mx-auto h-dashtable overflow-x-auto shadow-sm mt-10 rounded-sideicon sidebarNone:w-9p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora tenetur
        optio, saepe voluptates dicta vel nam perferendis velit aliquam
        laudantium quia pariatur. Temporibus ea dolorem illo eaque non nihil
        quidem blanditiis! Veniam quam nesciunt ab tempore. Sunt dolorem
        corrupti laboriosam nobis saepe! Cupiditate tenetur iste ab quasi quam
        molestias, harum tempora nobis ullam? Nesciunt facilis delectus esse
        molestiae nemo sint aliquam odit corporis, nobis quidem! Tenetur ipsa
        autem cumque quis quia doloribus ipsam, exercitationem blanditiis neque
        non quaerat fuga quibusdam provident? Ab, autem officiis saepe
        reprehenderit exercitationem non tempore voluptate! Quas deserunt nobis
        incidunt reprehenderit, eum facilis sunt provident unde error molestias
        nam, in tempore doloremque architecto inventore eaque porro! Ipsum quas
        eos reprehenderit blanditiis sint impedit, ut voluptatibus ratione at
        harum consequuntur sit, iure perspiciatis cum sequi. Delectus ea, nobis
        est fugiat libero minus culpa fugit. Praesentium sapiente enim, quaerat
        hic ipsa nobis nihil debitis a, perspiciatis id corrupti aliquid
        repellat! Rem minus iure suscipit ipsam magni amet vero veritatis
        laborum, totam temporibus repellendus similique, molestiae possimus
        perspiciatis fuga ut ea quae dolore sint eligendi. Perspiciatis eos
        recusandae, quis molestias ducimus consequatur ut repellat quae expedita
        doloremque numquam pariatur delectus eum, nemo incidunt laudantium
        dolores nam vel omnis dicta nulla quidem voluptatibus. Corrupti a
        doloremque quibusdam eius corporis reiciendis quasi necessitatibus
        officiis ratione fuga accusantium assumenda repellat nostrum quod
        laboriosam error, quidem optio nesciunt molestiae hic. Culpa blanditiis
        quidem ipsa dolores sit obcaecati esse distinctio voluptatibus quia,
        rerum enim nisi omnis consequuntur voluptas sequi consectetur laudantium
        qui mollitia dicta sed! Quia debitis voluptate impedit nobis ex ad
        numquam et deleniti aliquid! Enim quasi ad praesentium laboriosam
        eligendi! Consectetur, aspernatur reprehenderit dolore quam assumenda
        quod nulla, officia unde quas repellat laborum fugit nobis molestias
        aliquid cum. Perspiciatis velit nobis quaerat hic debitis dolorem,
        temporibus officia corporis possimus cum obcaecati cumque repellat
        magni, quod, mollitia quae numquam. Libero debitis ratione minus
        suscipit doloribus sunt placeat non nihil ipsam. Fugit rem incidunt
        ipsam earum nostrum veritatis odit assumenda molestias sunt in. Quis
        sint nisi repellat ad, libero esse, laboriosam atque recusandae
        veritatis inventore cumque odio obcaecati. Magnam eos sequi illo.
        Laborum blanditiis et nihil est excepturi, ullam molestias omnis
        consectetur ipsum facere maiores cumque corrupti. Voluptas qui quis
        natus totam alias magni nulla modi doloremque cumque, tenetur iusto
        dicta corporis eius asperiores porro! Consequatur sapiente animi alias
        tenetur doloribus earum, cumque maiores quisquam, tempore dolorum nulla
        maxime dicta veniam aperiam, beatae possimus.
      </div>
      {/* Side Bar */}
      <DashbarNav />
    </div>
  );
};

export default AdminDashboard;
