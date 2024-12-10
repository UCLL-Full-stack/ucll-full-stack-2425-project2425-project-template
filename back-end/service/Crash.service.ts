import { Crash } from '../model/crash';
import crashdb from '../repository/Crash.db';

const getCrashById = async (id: number): Promise<Crash | null> => {
    return crashdb.getCrashById({ id });
};

export default { getCrashById };
