import './App.scss';

function App() {

  const randomArray = [...Array(31).keys()];
  console.log(randomArray);

  return (
    <div className="simplebooker-main">
      <div className="datenumbers-container">
        {randomArray.map(item => {
          return (
            <div className="datenumbers">{item}</div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
