export interface Video {
    ok: boolean;
    mensaje:string;
    pagina:number;
    videos:Videos[];
}

export interface Videos{
  id: string;   
  titulo?: string 
  imagen1?: string,
  imagen2?: string,
  imagen3?: string,
  imagen4?: string,
  imagen5?: string,
  imagen6?: string,
  imagen7?: string,
  imagen8?: string,
  imagen9?: string,
  imagen10?: string,
  descripcion?: string,
  fecha?: string,
  fechamodificado?: string,
  tags?:string,
  visitas?:string
}

