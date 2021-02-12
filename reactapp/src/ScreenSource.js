import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'

function ScreenSource() {

  const [sourceList, setSourceList] = useState([])
  const [country, setCountry] = useState('fr')
  const [langage, setLangage] = useState('fr')

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
      const data = await fetch(`https://newsapi.org/v2/sources?language=${langage}&country=${country}&apiKey=b32c8b844d1243b1a7998d8228910f50`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [country, langage])

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
        <img src="/images/france.svg" style={{height: "40px", margin: "5px"}} onClick={() => {setCountry('fr'); setLangage('fr')}}></img>
         <img src="/images/united-kingdom.svg" style={{height: "40px", margin: "5px"}} onClick={() => {setCountry('gb'); setLangage('en')}}></img>
       </div>

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

export default ScreenSource;
