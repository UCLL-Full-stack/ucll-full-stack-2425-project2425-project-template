import buildDB from "../repository/build.db";
import { Build } from "../model/build";

const getAllBuilds = async (): Promise<Build[]> => {
    return await buildDB.getAllBuilds();
};

const getBuildById = async ({ id}: {id: number}): Promise<Build | null> => {
    const build = await buildDB.getBuildById({ id });
    if (!build) throw new Error(`Build with id ${id} does not exist`);
    return build;
};

export default {
    getAllBuilds,
    getBuildById,
};