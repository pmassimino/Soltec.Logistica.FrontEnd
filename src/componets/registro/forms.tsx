import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Chofer, Registro} from '../../models/model';
import { ErrorItem } from '@/utils/errors';

interface Props {
  onSubmit: (entity: Registro) => Promise<void>;
  onCancel: () => Promise<void>;
  isSubmitting: boolean;
  entity?: Registro;
  choferes?:Chofer[];
  errorList:ErrorItem[];
}

const RegistroForm = ({ onSubmit,onCancel, isSubmitting, entity,choferes,errorList }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Registro>({
    defaultValues: entity,
  });
  const [submitText, setSubmitText] = useState('Crear');

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar');
    }
  }, [entity]);

  const handleFormSubmit = (data: Registro) => {  
    onSubmit(data);
  };  
  return (
    <div>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div className='row'>
    <div className='col-2'>
        <label className='form-label' htmlFor="fecha">Fecha:</label>
        <input
          className='form-control'
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
        <label className="form-label" htmlFor="estado">Estado:</label>
        <select className='form-control' id="estado" {...register('estado', { required: true })}>
           <option value="">Seleccione un estado</option>          
           <option key="Disponible" value="Disponible" selected={"Disponible" === entity?.estado}>Disponible</option>
           <option key="NoDisponible" value="NoDisponible" selected={"NoDisponible" === entity?.estado}>No Disponible</option>
        </select>
        {errors.estado && <span>Este campo es requerido.</span>}
      </div>
      </div>
      <div>
        <ul>
          {errorList.map(item => (
            <li className="alert alert-info" key={item.key}>{item.message}</li>
          ))}
        </ul>
      </div>
      <div className='mt-2'>             
      <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
        {submitText}
      </button>      
      <button className='btn btn-primary ms-1' type="button" onClick={onCancel} >
          Cancelar
        </button>
      </div>
    </form>    
    </div>
    
    
  );
};

export default RegistroForm;
