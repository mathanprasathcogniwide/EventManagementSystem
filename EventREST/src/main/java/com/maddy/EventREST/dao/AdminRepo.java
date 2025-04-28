package com.maddy.EventEST.dao;

import com.maddy.EventREST.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Integer> {

    Admin findByUsername(String username);
}
