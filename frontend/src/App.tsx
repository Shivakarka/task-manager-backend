import TaskList from './components/TaskList';
import "./App.css"

const App: React.FC = () => {
  return (
    <div className='task-container'>
      <TaskList />
    </div>
  );
};

export default App;