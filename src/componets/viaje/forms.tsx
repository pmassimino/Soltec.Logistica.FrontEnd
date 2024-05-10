import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Chofer, TipoViaje, Viaje } from '../../models/model';
import { ErrorItem } from '@/utils/errors';

interface Props {
  onSubmit: (entity: Viaje) => Promise<void>;
  onCancel: () => Promise<void>;
  isSubmitting: boolean;
  entity?: Viaje;
  choferes?: Chofer[];
  tipoViajes?: TipoViaje[];
  errorList: ErrorItem[];
}

const ViajeForm = ({ onSubmit,onCancel, isSubmitting, entity, choferes, tipoViajes, errorList }: Props) => {
  const { register, handleSubmit,formState: { errors }, setValue } = useForm<Viaje>({
    defaultValues: entity,
  });
  
  const [submitText, setSubmitText] = useState('Crear');

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar');
    }
  }, [entity]);

  const handleFormSubmit = (data: Viaje) => {
    onSubmit(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='row'>
        <div  className="col-2">
          <label className="form-label" htmlFor="fecha">Fecha:</label>
          <input
            className="form-control"
            type="date"
            id="fecha"
            {...register('fecha', { required: true })}
          />
          {errors.fecha && <span>Este campo es requerido.</span>}
        </div>
        </div>    
        <div className='row'>    
        <div className='col-3'>       
          <label className="form-label" htmlFor="idChofer">Chofer:</label>
          <select className="form-control" id="idChofer" {...register('idChofer', { required: true })}>
            <option value="">Seleccione un chofer</option>
            {choferes && choferes.map((item) => (
              <option key={item.id} value={item.id} selected={item.id === entity?.idChofer}>
                {item.nombre}
              </option>
            ))}
          </select>
          {errors.idChofer && <span>Este campo es requerido.</span>}
        </div>
        </div>
        <div className='row'>
        <div className='col-3'>
          <label className="form-label" htmlFor="idTipo">Tipo Viaje:</label>
          <select className="form-control" id="tipoViaje" {...register('idTipo', { required: true })}>
            {tipoViajes && tipoViajes.map((item) => (
              <option key={item.id} value={item.id} selected={item.id === entity?.idTipo}>
                {item.nombre}
              </option>
            ))}
          </select>
          {errors.estado && <span>Este campo es requerido.</span>}
        </div>
        </div>
        <div className='row'>
        <div className='col-3'>
          <label className="form-label" htmlFor="concepto">Concepto:</label>
          <input
            className="form-control"
            type="text"
            id="concepto"
            {...register('concepto', { required: true })}
          />
          {errors.concepto && <span>Este campo es requerido.</span>}
        </div>
        </div>
        <div className='row'>
        <div className='col-2'>
          <label className="form-label" htmlFor="numeroComprobante">Numero CTG:</label>
          <input
            className="form-control"
            type="number"
            id="Nombre"
            {...register('numeroComprobante', { required: false })}
          />
          {errors.numeroComprobante && <span></span>}
        </div>
        <div className='col-1'>
          <label className="form-label" htmlFor="distancia">Distancia:</label>
          <input
            className="form-control"
            type="number"
            id="distancia"
            {...register('distancia', { required: false })}
          />
          {errors.numeroComprobante && <span></span>}
        </div>
        </div> 
        <div className='row mb-2'>
        <div className='col-3'>
          <label className="form-label" htmlFor="estado">Estado:</label>
          <select className="form-control" id="estado" {...register('estado', { required: true })}>
            <option value="">Seleccione un estado</option>
            <option key="EnViaje" value="EnViaje" selected={"EnViaje" === entity?.estado}>EnViaje</option>
            <option key="Finalizado" value="Finalizado" selected={"Finalizado" === entity?.estado}>Finalizado</option>
            <option key="Cancelado" value="Cancelado" selected={"Cancelado" === entity?.estado}>Cancelado</option>
          </select>
          {errors.estado && <span>Este campo es requerido.</span>}
        </div>
        </div>       
        <button className='btn btn-primary'type="submit" disabled={isSubmitting}>
          {submitText}
        </button>
        <button className='btn btn-primary ms-1' type="button" onClick={onCancel} >
          Cancelar
        </button>
      </form>
      <div>
        <ul>
          {errorList.map(item => (
            <li key={item.key}>{item.message}</li>
          ))}
        </ul>
      </div>
    </div>


  );
};

export default ViajeForm;
