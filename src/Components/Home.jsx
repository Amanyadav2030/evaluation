
export default function Home() {

    return (
      <div>
        <div>
          <h2 style = {{textAlign: "center"}} >Subscribed Events</h2>
          <div className = "subscribed-events">
             {/* Map the below container against your subcribed events */}
              <div >
                <img className="image" alt = "img" />
                <h4 className="title"> </h4>
                <div className="location"> </div>
                <div className="date"> </div>
                <div className="time"> </div>
                <div className="theme"> </div>
                <div className="description"> </div>
              </div>
          </div>

          <h2 style = {{textAlign: "center"}}>Recommended Events</h2>
          <div className = "recommended-events" style = {{display: "flex", gap: "50px", margin: "50px", flexWrap: "wrap"}} >
             {/* Map the below container against your recommended events data */}
              <div >
                <img className="image" alt = "img" />
                <h4 className="title"> </h4>
                <div className="location"> </div>
                <div className="date"> </div>
                <div className="time"> </div>
                <div className="theme"> </div>
                <div className="description"> </div>
              </div>
            </div>
        </div>
        
      </div>
     
    )
}
