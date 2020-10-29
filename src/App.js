import './App.css';


import D3 from './components/D3'
function App() {


  // add funtionality later..........
  window.addEventListener('resize', () => {
    console.log(' you resized the screen, why?')
  })

  return (
    <div className="App">
      <D3 />
    </div>
  );
}

export default App;
