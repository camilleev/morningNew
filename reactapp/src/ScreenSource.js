import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux'
import token from './reducers/token';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [country, setCountry] = useState('fr')
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  useEffect(() => {
    const APIResultsLoading = async() => {
     // console.log(props.token)
      var langue = "fr"
      var country = "fr"
      if(selectedLang == 'en'){
        var langue = "en"
        var country = "us"
      }
      props.changeLang(selectedLang)
      const data = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=d0aab4b7775b43eea657b4235f2cbf79`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [selectedLang])

  var changeLangage = async (country, langage) => {
    setCountry(country)
    setSelectedLang(langage)

    const response = await fetch('/change-langage', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `country=${country}&langage=${langage}&token=${props.token}`
    })
  }

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
        <img src="/images/france.svg" style={{height: "40px", margin: "5px"}} onClick={() => {changeLangage("fr", "fr")}}></img>
        <img src="/images/united-kingdom.svg" style={{height: "40px", margin: "5px"}} onClick={() => {changeLangage("us", "en")}}></img>
       </div>

       {props.token}

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

// export default ScreenSource;

function mapStateToProps(state){
  return {selectedLang: state.selectedLang, token: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)