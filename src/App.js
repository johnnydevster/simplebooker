import './App.scss';

function App() {

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };
  
  const dateArray = [];
  for (var i = 1; i <= getDaysInMonth(6, 2021); i++) { //replace with chosen month and year
    dateArray.push(i);
  }

  return (
    <div className="simplebooker-main">
      <div className="datenumbers-container">
        {dateArray.map(item => {
          return (
            <div className="datenumbers">{item}</div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
