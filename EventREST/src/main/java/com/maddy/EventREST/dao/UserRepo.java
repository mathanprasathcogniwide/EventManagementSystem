package com.maddy.EventREST.dao;

import com.maddy.EventREST.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {

    User findByUsername(String username);
    boolean existsByUsername(String username);
}
