import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Chofer, Viaje } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";

const TestIndex = () => {
  return (
    <Layout title='Viajes'>
      <div className="dropdown show">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </Layout>
  );
};

export default withAuth(TestIndex);
