import * as mediasoup from "mediasoup";
import { Worker } from "mediasoup/node/lib/Worker";

let worker: Worker;

const startMediasoupWorker = async () => {
  worker = await mediasoup.createWorker({
    logLevel: "warn",
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  });

  console.log(`✅ mediasoup worker started with pid ${worker.pid}`);

  worker.on("died", () => {
    console.error("mediasoup worker has died");
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
};

export { startMediasoupWorker, worker };
