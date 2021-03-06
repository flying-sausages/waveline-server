import * as os from "os";

import { LibraryService } from "../Services/library.service";
import { InfoModel } from "../Models/info.model";
import { Resource, Get } from "@wellenline/via";

@Resource("/system")
export class System {
	@Get("/sync")
	public async sync() {
		return {
			status: true,
		};
	}

	@Get("/info")
	public async info() {
		const info = await InfoModel.findOne().lean();
		return {
			version: process.env.npm_package_version,
			arch: os.arch(),
			node_version: process.version,
			num_cpus: os.cpus().length,
			uptime: process.uptime(),
			free_mem: os.freemem(),

			...info
		};
	}
}
