import { useState, useEffect, RefCallback, useCallback } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { Chofer} from '../../models/model';
import { ErrorItem } from '@/utils/errors';
import ErrorList from '@/componets/errorList';

interface Props {
  onSubmit: (entity: Chofer) => Promise<void>;
  onCancel: () => Promise<void>;
  isSubmitting: boolean;
  entity?: Chofer;
  errorList:ErrorItem[];
}

const ChoferForm = ({ onSubmit,onCancel, isSubmitting, entity,errorList }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Chofer>({
    defaultValues: entity,
  });
  const [submitText, setSubmitText] = useState('Crear');

  useEffect(() => {
    if (entity) {
      setSubmitText('Guardar');
    }
  }, [entity]);

  const handleFormSubmit = (data: Chofer) => {  
    onSubmit(data);
  };  
  return (
    <div>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='row'>
      <div className='col-4'>
        <label className="form-label" htmlFor="nombre">Nombre:</label>
        <input
          className="form-control"
          type="text"
          id="nombre"          
          {...register('nombre', { required: true })}
        />
        {errors.nombre && <span>Este campo es requerido.</span>}
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
        <label  className="form-label" htmlFor="numeroDocumento">CUIT:</label>
        <input
          className="form-control"
          type="number"
          id="numeroDocumento"          
          {...register('numeroDocumento', { required: true })}
        />
        {errors.numeroDocumento && <span>Este campo es requerido.</span>}
      </div>  
      </div>    
      <div className='row'>
      <div className='col-3'>
        <label  className="form-label" htmlFor="telefono">Telefono:</label>
        <input
          className="form-control"
          type="text"
          id="telefono"          
          {...register('telefono', { required: false })}
        />
        {errors.telefono && <span></span>}
      </div> 
      </div>     
      <div className='row'>
      <div className='col-4'>
        <label htmlFor="email">email:</label>
        <input
          className="form-control"
          type="text"
          id="email"          
          {...register('email', { required: false })}
        />
        {errors.telefono && <span></span>}
      </div> 
      </div>     
      <div className='row'>
      <div className='col-1'>
        <label  className="form-label" htmlFor="patente">Patente:</label>
        <input
          className="form-control"
          type="text"
          id="patente"          
          {...register('patente', { required: true })}
        />
        {errors.patente && <span>Este campo es requerido.</span>}
      </div> 
      <div className='col-1'>
        <label className="form-label" htmlFor="patenteAcoplado">Patente Acoplado:</label>
        <input
          className="form-control"
          type="text"
          id="patenteAcoplado"          
          {...register('patenteAcoplado', { required: false })}
        />        
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

export default ChoferForm;
