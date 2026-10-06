export function validarNombre(nombre: string) {
  return nombre.trim() !== '';
}

export function validarPrecio(precio: string) {
  if (precio.trim() === '') return false;
  const numero = Number(precio);
  return !isNaN(numero) && numero > 0;
}

export function validarCategoria(categoria: string) {
  return categoria.trim() !== '';
}

export function validarStock(stock: string) {
  if (stock.trim() === '') return false;
  const numero = Number(stock);
  return Number.isInteger(numero) && numero >= 0;
}
