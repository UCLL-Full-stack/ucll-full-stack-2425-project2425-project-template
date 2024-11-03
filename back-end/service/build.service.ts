import buildDB from "../repository/build.db";
import { Build } from "../model/build";

const getAllBuilds = (): Build[] => buildDB.getAllBuilds();

const getBuildById = (id: number): Build => {
    const build = buildDB.getBuildById({ id });
    if (!build) throw new Error(`Build with id ${id} does not exist`);
    return build;
};

export default { getAllBuilds, getBuildById };