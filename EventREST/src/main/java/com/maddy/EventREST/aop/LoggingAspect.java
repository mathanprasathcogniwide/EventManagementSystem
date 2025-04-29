package com.maddy.EventREST.aop;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.maddy.EventREST.service.EventService.getEvent(..)) || execution(* com.maddy.EventREST.service.EventService.updateEvent(..))")
    public void logMethod(JoinPoint jp){
        LOGGER.info("Method Called {}", jp.getSignature().getName());
    }

    @After("execution(* com.maddy.EventREST.service.EventService.getEvent(..)) || execution(* com.maddy.EventREST.service.EventService.updateEvent(..))")
    public void LogMethodExecuted(JoinPoint jp){
        LOGGER.info("Method Executed {}",jp.getSignature().getName());
    }

    @AfterThrowing("execution(* com.maddy.EventREST.service.EventService.getEvent(..)) || execution(* com.maddy.EventREST.service.EventService.updateEvent(..))")
    public void logMethodCrash(JoinPoint jp){
        LOGGER.info("Method Has Some Issues {}", jp.getSignature().getName());
    }

    @AfterReturning("execution(* com.maddy.EventREST.service.EventService.getEvent(..)) || execution(* com.maddy.EventREST.service.EventService.updateEvent(..))")
    public void logMethodExecutedSuccess(JoinPoint jp){
        LOGGER.info("Method Performed Successfully {}",jp.getSignature().getName());
    }

}
