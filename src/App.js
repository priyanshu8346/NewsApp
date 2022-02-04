import './App.css';
import React, {  useState } from 'react';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
const App=()=> {
   const api="ffc648aa76aa4e96a0cc17037adb155e";
   console.log(api)
  
  const [progress, setProgress] = useState(0);
  const set=(element)=>{
    setProgress(element);
  }
 
    return (
      <div>
      <Router>
      
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route path="/" element={< News setProgress={set} api={api} key={'Home'} pageSize={5} category={'general'} country={'in'} />}></Route>
          <Route exact path="/business" element={< News setProgress={set} api={api} key={'business'} pageSize={5} category={'business'} country={'in'} />}></Route>
        
          <Route exact path="/entertainment" element={ < News setProgress={set} api={api} key={'entertainment'} pageSize={5} category={'entertainment'} country={'in'} />}>

          </Route>
          <Route exact path="/general" element={< News setProgress={set} api={api} key={'general'} pageSize={5} category={'general'} country={'in'} />}>

          </Route>
          <Route exact path="/health" element={< News setProgress={set} api={api} key={'health'} pageSize={5} category={'health'} country={'in'} />}>

          </Route>
          <Route exact path="/sports" element={< News setProgress={set} api={api} key={'sports'} pageSize={5} category={'sports'} country={'in'} />}>
          </Route>

            <Route exact path="/technology" element={ < News setProgress={set} api={api} key={'technology'} pageSize={5} category={'technology'} country={'in'} />}>

            </Route>
            <Route exact path="/science" element={ < News setProgress={set} api={api} key={'science'} pageSize={5} category={'science'} country={'in'} />}>

            </Route> 

        </Routes>

     </Router> </div>);
  
}
export default App;