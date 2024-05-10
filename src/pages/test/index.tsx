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
          <Link className="dropdown-item" href="#">Action</Link>
          <Link className="dropdown-item" href="#">Another action</Link>
          <Link className="dropdown-item" href="#">Something else here</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" href="#">Action</Link></li>
          <li><Link className="dropdown-item" href="#">Another action</Link></li>
          <li><Link className="dropdown-item" href="#">Something else here</Link></li>
        </ul>
      </div>
    </Layout>
  );
};

export default withAuth(TestIndex);
