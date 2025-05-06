import TodoList from '../components/TodoList.tsx';
import Navbar from '../Layouts/Navbar.tsx';

function Home() {
  return (
    <div className="relative">
      <Navbar />
      <TodoList />
    </div>
  );
}

export default Home;
