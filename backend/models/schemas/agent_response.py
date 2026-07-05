import time

class AgentResponse:

    @staticmethod
    def success(
        agent,
        data,
        start_time
    ):

        return {

            "agent": agent,

            "success": True,

            "execution_time_ms":
            round(
                (time.time()-start_time)*1000,
                2
            ),

            "data": data,

            "error": None

        }

    @staticmethod

    def failure(
        agent,
        message,
        start_time
    ):

        return {

            "agent": agent,

            "success": False,

            "execution_time_ms":
            round(
                (time.time()-start_time)*1000,
                2
            ),

            "data": None,

            "error": message

        }