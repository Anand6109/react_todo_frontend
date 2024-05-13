import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast'; // Make sure to import toast for displaying messages
import Todoitem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading state as false
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      await axios.put(`${server}/task/${id}`, {}, { withCredentials: true });
      setRefresh(true); // Trigger refresh
      toast.success(`Task ID ${id} updated`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${server}/task/${id}`, { withCredentials: true });
      setRefresh(true); // Trigger refresh
      toast.success(`Task ID ${id} deleted`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/task/new`, {
        title,
        description
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      });

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(true); // Trigger refresh
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]); // Refresh when refresh state changes

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' required />
            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' required />
            <button disabled={loading} type='submit'>Add Task</button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((task) => (
          <Todoitem
            key={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={() => updateHandler(task._id)} // Pass the task ID to the handler
            deleteHandler={() => deleteHandler(task._id)} // Pass the task ID to the handler
            id={task._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
