import { web } from "./application/web";
import { logger } from "./application/logging";

web.listen(300, () => {
  logger.info("App start");
});