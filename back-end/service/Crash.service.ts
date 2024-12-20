import { Crash } from '../model/Crash';
import crashdb from '../repository/Crash.db';

const getCrashById = async (id: number): Promise<Crash | null> => {
    return crashdb.getCrashById({ id });
};

export default { getCrashById };
