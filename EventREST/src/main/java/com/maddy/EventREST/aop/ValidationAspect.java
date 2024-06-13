package com.maddy.EventREST.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ValidationAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationAspect.class);

    @Around("execution(* com.maddy.EventREST.service.EventService.getEvent(..)) && args(eventTitle)")
    public Object validateAndUpdate(ProceedingJoinPoint jp, String eventTitle) throws Throwable{

        if(eventTitle == null || eventTitle.isEmpty()){
            LOGGER.info("EventTitle is Null or Empty");
            throw new IllegalArgumentException("EventTitle cannot be null or empty");
        }
        Object obj = jp.proceed(new Object[]{eventTitle});
        return obj;
    }

}
