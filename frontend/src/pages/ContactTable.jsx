import React, { useEffect, useState } from "react";
import { fetchAll } from "../services/apiService";

export default function ContactTable() {
  const [contacts, setContact] = useState([]);
   const [loading,setLoading]=useState(true)

  const fetchContact = async () => {
   try{
    setLoading(true)
   const response = await fetchAll("contact/index");
    const { status, contactss } = response.data;
    setContact(contactss);
   }catch(e){
    console.log(e.error)

   }finally{
    setLoading(false)
   }
  };
  if (contacts) console.log(contacts);
  useEffect(() => {
    fetchContact();
  }, []);

  const [msgid,setId]=useState(null);
 
  return (
  
    <div className="ccontainer mt-5">
      <div className="row">
        <div className="justify-content-between align-items-center">
          <div className="col-md-6 offset-md-3">
           
           <div className="bg-warning text-white text-center">Message List</div>

              {loading ? (
     <div className="text-center my-5">
          <div className="spinner-border text-primary" />
        </div>
      ):(
          contacts && contacts.length > 0 ? (
            contacts.map((c, i) => (
              <div className="card mt-2" key={i}>
                <div className="card-title text-primary fw-bold">
                    {
                        msgid===c.id ? c.name : c.name.slice(0,5) + "...." 
                    }

                </div>
                <div className="card-body">
                  <p>
                    {
                        msgid===c.id ? c.description : c.description.slice(0,130) + "...." 
                    }
                  </p>
                </div>
                <div className="card-foot">
                    <button  className="btn btn-link btn-sm p-0" onClick={()=>setId(msgid===c.id ? null : c.id)}>
                       {msgid ===c.id ? "Lire moins" : "Lire plus"}
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex">...no Dada to display.....</div>
          )
      )}

        
          </div>
        </div>
      </div>
    </div>
  );
}
