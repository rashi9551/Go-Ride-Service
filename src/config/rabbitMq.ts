import 'dotenv/config'

export default {
    rabbitMQ: {
      url: String(process.env.RabbitMqUrl),
    },
    queues: {
        rideQueue: "rides_queue",
      }
  };

 