
package com.maddy.EventREST.service;

import com.maddy.EventREST.dao.AdminRepo;
import com.maddy.EventREST.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Admin getAdminById(int id) {
        return adminRepo.findById(id).orElse(null);
    }

    public Admin createAdmin(Admin admin) {
        // You may want to perform validation here, such as checking if the username already exists
        return adminRepo.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
        // You may want to handle validation and error cases here
        return adminRepo.save(admin);
    }

    public void deleteAdmin(int id) {
        adminRepo.deleteById(id);
    }
}
