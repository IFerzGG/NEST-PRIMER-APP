## jwt-auth.guards
Cuando el cliente hace una peticion verificamos que realmente haya iniciado sesision o colocado su token generado al logearse, eso lo hicimos publico en app module
# Decorator Publico
Al poner el decorador @publico hacemos que el cliente pueda hacer una peticion al servidor sin tener un token generado

## roles.guards
Aqui verificamos si tiene el cliente el rol adecuado para hacer la peticion, En patch delete y post tiene que tener un cierto rol en especifico
# Decorator Roles
Aqui creamos los roles especificos que va a validar que tenga el cliente

## logging.interceptor
Aqui empieza a medir el tiempo cuando el cliente hace la peticion hasta que genera la respuesta el servidor

## ValidationPipe
Se configura en en el main.ts y se agrega a las DTO para asi verificar si cumple con el formato adecuado de las body que mande el cliente, como por ejemplo que el email esta en formato adecuado

## CitasController
Despues de que haya pasado la peticion por las zonas de seguridad lo mandamos a la peticion correspondiente que haya echo y se manda al citasService
# CitasService con PacienteService
Create: Si la peticion fue mandada al post sirve para crear una cita nueva y lo primero que hace si existe el paciente al generarle una cita y mandamos la peticion al PACIENTE SERVICE par que lo encuentre.
Tambien revisamos si existe al medico que se le asignara a la cita
Despues al checar que si existe el medico y el paciente manda la peticion a la base de datos para asi crear la cita y lo retorna

FindAll: Aqui la peticion del cliente verifica que muestre las citas que hay en la base de datos

FindOne: Aqui se verifica si existe la cita que busca el cliente y si no retorna un error NOT FOUND al cliente

Update: Aqui el cliente puede hacer modificaciones de una cita ya creada, como por ejemplo modificar el estado de la cita y si no encuentra la cita que mando el cliente retorna un error de NOT FOUND 

Delete: Aqui el cliente puede eliminar una cita que ya ha sido creada en la base de datos y si no esta la cita que quiere eliminar se retorna un error NOT FOUND

## prisma-exception.filters
Aqui generamos las respuestas HTTP que queremos mostrar al cliente cuando prisma genere un error en la base de datos, ya sea que no se encontro un registro o ese registro tenga un valor Unico

## logging.interceptor
Aqui la paticion respuesta pasa para registrar el tiempo total que se tardo en regresar del serividor al cliente

## transform.interceptor
Aqui modifica y tranforma el formato que se va a mostrar la respuesta el cliente 