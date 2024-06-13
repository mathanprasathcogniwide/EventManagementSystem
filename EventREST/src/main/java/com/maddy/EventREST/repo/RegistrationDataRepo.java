package com.maddy.EventREST.repo;

import com.maddy.EventREST.model.RegistrationData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationDataRepo extends JpaRepository<RegistrationData, String> {

}
