import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarNombre,
  validarPrecio,
  validarCategoria,
  validarStock,
} from '../utils/validators';

type Producto = {
  nombre: string;
  precio: string;
  categoria: string;
  stock: string;
};

export default function RegistroProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  const [errores, setErrores] = useState<string[]>([]);
  const [registrado, setRegistrado] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  const nombreValido = validarNombre(nombre);
  const precioValido = validarPrecio(precio);
  const categoriaValida = validarCategoria(categoria);
  const stockValido = validarStock(stock);

  const limpiarMensajes = () => {
    setErrores([]);
    setRegistrado(false);
  };

  const guardarProducto = () => {
    if (registrado) return;

    const lista: string[] = [];

    if (!nombreValido) lista.push('El nombre del producto es obligatorio.');
    if (!precioValido) lista.push('El precio debe ser un número mayor a 0.');
    if (!categoriaValida) lista.push('La categoría es obligatoria.');
    if (!stockValido) lista.push('El stock debe ser un número entero de 0 o más.');

    if (lista.length > 0) {
      setErrores(lista);
      setRegistrado(false);
      return;
    }

    // Los datos se guardan solo en memoria (estado), sin base de datos
    setProductos([
      ...productos,
      { nombre: nombre.trim(), precio, categoria: categoria.trim(), stock },
    ]);
    setErrores([]);
    setRegistrado(true);
  };

  const cantidadValidas = [
    nombreValido,
    precioValido,
    categoriaValida,
    stockValido,
  ].filter(Boolean).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ENCABEZADO */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>+</Text>
          </View>

          <View>
            <Text style={styles.overline}>NUEVO PRODUCTO</Text>
            <Text style={styles.title}>Registro de Producto</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa los datos para registrar un nuevo producto.
        </Text>

        {/* TARJETA DEL FORMULARIO */}

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Datos del producto</Text>
          <Text style={styles.sectionDescription}>
            Todos los campos son obligatorios.
          </Text>

          {/* NOMBRE */}

          <AppInput
            label="Nombre"
            placeholder="Ej: Laptop"
            value={nombre}
            hasError={errores.length > 0 && !nombreValido}
            onChangeText={(value) => {
              setNombre(value);
              limpiarMensajes();
            }}
          />

          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido ? styles.validText : styles.invalidText,
              ]}
            >
              {nombreValido ? 'Nombre válido' : 'Ingresa el nombre'}
            </Text>
          )}

          {/* PRECIO */}

          <AppInput
            label="Precio"
            placeholder="Ej: 2500"
            value={precio}
            keyboardType="decimal-pad"
            hasError={errores.length > 0 && !precioValido}
            onChangeText={(value) => {
              setPrecio(value);
              limpiarMensajes();
            }}
          />

          {precio.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                precioValido ? styles.validText : styles.invalidText,
              ]}
            >
              {precioValido ? 'Precio válido' : 'Debe ser mayor a 0'}
            </Text>
          )}

          {/* CATEGORIA */}

          <AppInput
            label="Categoría"
            placeholder="Ej: Tecnología"
            value={categoria}
            hasError={errores.length > 0 && !categoriaValida}
            onChangeText={(value) => {
              setCategoria(value);
              limpiarMensajes();
            }}
          />

          {categoria.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                categoriaValida ? styles.validText : styles.invalidText,
              ]}
            >
              {categoriaValida ? 'Categoría válida' : 'Ingresa la categoría'}
            </Text>
          )}

          {/* STOCK */}

          <AppInput
            label="Stock"
            placeholder="Ej: 10"
            value={stock}
            keyboardType="numeric"
            hasError={errores.length > 0 && !stockValido}
            onChangeText={(value) => {
              setStock(value);
              limpiarMensajes();
            }}
          />

          {stock.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                stockValido ? styles.validText : styles.invalidText,
              ]}
            >
              {stockValido ? 'Stock válido' : 'Debe ser un entero de 0 o más'}
            </Text>
          )}

          {/* ERROR */}

          {errores.length > 0 && (
            <View style={styles.errorBox}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>No se pudo registrar</Text>

                {errores.map((mensaje) => (
                  <Text key={mensaje} style={styles.errorMessage}>
                    - {mensaje}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* EXITO */}

          {registrado && (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>OK</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>
                  Producto registrado con éxito
                </Text>
                <Text style={styles.successMessage}>
                  Todos los datos son válidos.
                </Text>
              </View>
            </View>
          )}

          {/* BOTON */}

          <AppButton title="Registrar producto" onPress={guardarProducto} />
        </View>

        {/* VALIDACIONES */}

        <View style={styles.validationSection}>
          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>
                Reglas aplicadas al formulario
              </Text>
            </View>

            <View style={styles.counter}>
              <Text style={styles.counterText}>{cantidadValidas}/4</Text>
            </View>
          </View>

          <ValidationRow
            title="Nombre obligatorio"
            description="El campo no puede estar vacío."
            valid={nombreValido}
          />

          <ValidationRow
            title="Precio mayor a 0"
            description="Debe ser un número positivo."
            valid={precioValido}
          />

          <ValidationRow
            title="Categoría obligatoria"
            description="El campo no puede estar vacío."
            valid={categoriaValida}
          />

          <ValidationRow
            title="Stock válido"
            description="Número entero igual o mayor a 0."
            valid={stockValido}
          />
        </View>

        {/* PRODUCTOS REGISTRADOS (EN MEMORIA) */}

        {productos.length > 0 && (
          <View style={styles.listSection}>
            <Text style={styles.validationTitle}>Productos registrados</Text>
            <Text style={styles.validationSubtitle}>
              Guardados en memoria mientras la app esté abierta
            </Text>

            {productos.map((p, index) => (
              <View key={index} style={styles.productRow}>
                <Text style={styles.productName}>{p.nombre}</Text>
                <Text style={styles.productInfo}>
                  Categoría: {p.categoria} | Precio: S/ {p.precio} | Stock:{' '}
                  {p.stock}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer}>
          S10 | AP5 - Formulario con validaciones
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* COMPONENTE PARA LAS VALIDACIONES */

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>
      <View
        style={[
          styles.validationCircle,
          valid ? styles.validationCircleValid : styles.validationCirclePending,
        ]}
      >
        <Text
          style={[
            styles.validationIcon,
            valid ? styles.validationIconValid : styles.validationIconPending,
          ]}
        >
          {valid ? 'OK' : '-'}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          valid ? styles.statusBadgeValid : styles.statusBadgePending,
        ]}
      >
        <Text
          style={[
            styles.statusBadgeText,
            valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'OK' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}

/* ESTILOS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#172033',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
    marginBottom: 24,
  },

  /* FORMULARIO */

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#98A2B3',
    marginBottom: 22,
  },

  /* ESTADO DE CAMPOS */

  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText: {
    color: '#16A34A',
  },

  invalidText: {
    color: '#D97706',
  },

  /* ERROR */

  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 18,
  },

  /* EXITO */

  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  successIconText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
  },

  /* VALIDACIONES */

  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  validationTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#98A2B3',
  },

  counter: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },

  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  validationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },

  validationCirclePending: {
    backgroundColor: '#F3F4F6',
  },

  validationIcon: {
    fontSize: 12,
    fontWeight: '800',
  },

  validationIconValid: {
    color: '#16A34A',
  },

  validationIconPending: {
    color: '#98A2B3',
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 3,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#98A2B3',
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },

  statusBadgePending: {
    backgroundColor: '#F2F4F7',
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  statusBadgeTextValid: {
    color: '#027A48',
  },

  statusBadgeTextPending: {
    color: '#667085',
  },

  /* LISTA EN MEMORIA */

  listSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginTop: 20,
  },

  productRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    marginTop: 12,
  },

  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 3,
  },

  productInfo: {
    fontSize: 12,
    color: '#667085',
  },

  /* FOOTER */

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 22,
  },
});
